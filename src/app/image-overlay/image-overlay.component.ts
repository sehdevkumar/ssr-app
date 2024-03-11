/* eslint-disable max-lines */
import { SubSink } from 'subsink';
import {
  AfterViewInit, Component, ElementRef, Inject, Input, OnChanges, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface Dim {
  w: number;
  h: number;
}

export interface ImageOverlayData {
   imageUrl:string;
   isZoomPanAllowd:boolean
   isImageDimUsed:boolean;
}

@Component({
  selector: 'app-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.scss'],
  standalone: true,
})
export class ImageOverlayComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('canvasRefView') canvasRefView: ElementRef<HTMLDivElement>;
  @ViewChild('canvasRef', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;

  subSink: SubSink = new SubSink();

  cells: any[] = [];
  imageUrl: string = '';

  canvas!: HTMLCanvasElement;

  // Canvas Renderer 2d Context
  ctx: CanvasRenderingContext2D;

  // Create a variable to store the current zoom level
  zoomLevel = 1;

  // Create variables to store the current pan offset
  panOffsetX = 0;
  panOffsetY = 0;

  zoomStep = 0.1;
  zoomFactor = 2;

  // For Panning...
  isMousePressed = false;
  lastMouseX = 0;
  lastMouseY = 0;

  touchZoomFactor = 1.1;

  // Input Decorator for the Input Mat Data
  @Input() matDataInput: ImageOverlayData;

  onLocalChangesWatch$: Subject<any> = new Subject<any>();

  pinchSubject = new Subject<TouchEvent>();

  private imageDim: Dim = {
    w: 0,
    h: 0,
  };

  isPanning: boolean;
  startPanOffsetX: number;
  startPanOffsetY: number;
  isPinching: boolean;
  isExpanded: boolean = false;

  canvasWithoutZoomedDim: Dim = {
    w: 420,
    h: 420,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public matData: ImageOverlayData,
    private matRef: MatDialogRef<ImageOverlayComponent>
  ) {
    // Noting to do....
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  ngOnInit(): void {
    console.log(this.matData);
  }

  ngOnChanges(): void {
    this.matData = this.matDataInput;
    // Initializing the Canvas and Context
    if (this.canvas !== undefined) {
      this.subSink.unsubscribe();
      this.onRemoveEventListeners();
      this.canvas = undefined as any;
      this.ctx = undefined as any;
      this.zoomLevel = 1;
      this.panOffsetX = 0;
      this.panOffsetY = 0;
      this.touchZoomFactor = 1.1;
      setTimeout(() => {
        this.onInitRendering();
      }, 100);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onInitRendering();
    }, 100);
  }

  onInitRendering(): void {
    // Initializing the Canvas and Context
    this.canvas = this.canvasRef?.nativeElement;
    this.ctx = this.canvas?.getContext('2d') as any;
    if (this.matData?.isZoomPanAllowd) {
      this.isExpanded = false;
      this.onInitilizedAndRegisterEvent();
    }

    const sub2 = this.pinchSubject
      .pipe(debounceTime(50)) // Adjust the debounce time as needed
      .subscribe((event: TouchEvent) => {
        event?.preventDefault();
        this.processPinch(event);
      });

    this.onStartRendering(this.matData);

    this.subSink.add(sub2);
  }

  // onUserPermissionsCommonValidation(accessCode: UserRolePermissionsEnum) {
  //   return this.userPermissionsCommonValidationClass.onUserPermissionsCommonValidation(accessCode);
  // }

  onInitilizedAndRegisterEvent(): void {
    // Add event listeners for zooming and panning
    this.canvas.addEventListener('wheel', this.handleZoom.bind(this));
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));

    // For Mobile Devices

    this.canvas.addEventListener('touchstart', this.startPanTouch.bind(this));
    this.canvas.addEventListener('touchmove', this.panTouch.bind(this));
    this.canvas.addEventListener('touchend', this.endPanTouch.bind(this));
    this.canvas.addEventListener('touchcancel', this.endPanTouch.bind(this));
    this.canvas.addEventListener('touchmove', this.handlePinch.bind(this), { passive: false });
  }

  onRemoveEventListeners(): void {
    this.canvas.removeEventListener('wheel', this.handleZoom.bind(this));
    this.canvas.removeEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.removeEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.removeEventListener('mouseleave', this.onMouseLeave.bind(this));
    this.canvas.removeEventListener('touchstart', this.startPanTouch.bind(this));
    this.canvas.removeEventListener('touchmove', this.panTouch.bind(this));
    this.canvas.removeEventListener('touchcancel', this.endPanTouch.bind(this));
    this.canvas.removeEventListener('touchmove', this.handlePinch.bind(this));
  }

  startPanTouch(event: TouchEvent): void {
    event?.preventDefault();
    if (event.touches.length === 1) {
      // Check if there is only one touch point
      this.isPanning = true; // Set the panning flag to true
      this.startPanOffsetX = event.touches[0].clientX; // Store the initial X position of the touch
      this.startPanOffsetY = event.touches[0].clientY; // Store the initial Y position of the touch
    }
  }

  panTouch(event: TouchEvent): void {
    event.preventDefault();
    if (!this.isPanning || event.touches.length !== 1) {
      // Check if panning is not active or there are more/less than one touch point
      return; // Exit the function if the conditions are not met
    }

    const panDistanceX = event.touches[0].clientX - this.startPanOffsetX; // Calculate the distance moved horizontally
    const panDistanceY = event.touches[0].clientY - this.startPanOffsetY; // Calculate the distance moved vertically

    this.panOffsetX += panDistanceX; // Update the X offset for panning
    this.panOffsetY += panDistanceY; // Update the Y offset for panning

    requestAnimationFrame(() => {
      this.onDrawCanvas(this.imageUrl); // Trigger a canvas redraw with the updated pan offset
    });

    this.startPanOffsetX = event.touches[0].clientX; // Update the initial X position for the next pan event
    this.startPanOffsetY = event.touches[0].clientY; // Update the initial Y position for the next pan event
  }

  endPanTouch(): void {
    this.isPanning = false; // Set the panning flag to false to indicate the end of panning

    setTimeout(() => {
      requestAnimationFrame(() => {
        this.onDrawCanvas(this.imageUrl); // Trigger a canvas redraw with the updated pan offset
      });
    }, 5000);
  }

  processPinch(event: TouchEvent): void {
    event.preventDefault();
    if (this.isPinching || this.isPanning) {
      // Check if pinch processing is already in progress
      return; // Exit the function if pinch processing is active
    }

    this.isPinching = true; // Set the pinch processing flag to true

    const rect = this.canvas.getBoundingClientRect(); // Get the boundaries of the canvas
    const touch1 = event.touches[0]; // Get the first touch point
    const touch2 = event.touches[1]; // Get the second touch point
    let prevDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY); // Calculate the initial distance between the touch points

    const centerX = (touch1.clientX + touch2.clientX) / 2 - rect.left; // Calculate the X position of the center between the touch points
    const centerY = (touch1.clientY + touch2.clientY) / 2 - rect.top; // Calculate the Y position of the center between the touch points

    const minZoomLevel = 1; // Set the minimum zoom level
    const maxZoomLevel = 50; // Set the maximum zoom level

    const moveHandler = (moveEvent: TouchEvent) => {
      event.preventDefault();
      // Define the handler for touch move events
      const moveTouch1 = moveEvent.touches[0]; // Get the first touch point of the move event
      const moveTouch2 = moveEvent.touches[1]; // Get the second touch point of the move event
      const moveDistance = Math.hypot(moveTouch2.clientX - moveTouch1.clientX, moveTouch2.clientY - moveTouch1.clientY); // Calculate the distance between the move touch points

      const zoomFactor = moveDistance / prevDistance; // Calculate the zoom factor based on the change in distance
      const prevZoomLevel = this.zoomLevel; // Store the previous zoom level

      const newZoomLevel = Math.max(minZoomLevel, Math.min(maxZoomLevel, prevZoomLevel * zoomFactor)); // Calculate the new zoom level based on the zoom factor

      const scaleRatio = newZoomLevel / prevZoomLevel; // Calculate the scale ratio for zooming
      const panOffsetX = centerX - (centerX - this.panOffsetX) * scaleRatio; // Calculate the new X offset for panning and zooming
      const panOffsetY = centerY - (centerY - this.panOffsetY) * scaleRatio; // Calculate the new Y offset for panning and zooming

      // Adjust the pan offset based on the zoom level change
      const panOffsetChangeX = panOffsetX - this.panOffsetX;
      const panOffsetChangeY = panOffsetY - this.panOffsetY;
      this.panOffsetX += panOffsetChangeX; // Update the X offset for panning and zooming
      this.panOffsetY += panOffsetChangeY; // Update the Y offset for panning and zooming

      // Update the zoom level with the new value
      this.zoomLevel = newZoomLevel;

      // Store the current distance for the next move event
      prevDistance = moveDistance;

      requestAnimationFrame(() => {
        this.onDrawCanvas(this.imageUrl); // Trigger a canvas redraw with the updated pan and zoom parameters
      });
    };

    const endHandler = () => {
      // Define the handler for touch end events
      this.canvas.removeEventListener('touchmove', moveHandler); // Remove the move handler from the canvas
      this.canvas.removeEventListener('touchend', endHandler); // Remove the end handler from the canvas
      this.isPinching = false; // Set the pinch processing flag to false
    };

    this.canvas.addEventListener('touchmove', moveHandler); // Add the move handler to the canvas
    this.canvas.addEventListener('touchend', endHandler); // Add the end handler to the canvas
  }

  handlePinch(event: TouchEvent): void {
    event?.preventDefault();
    if (event.touches.length >= 2) {
      // Check if there are at least two touch points
      event.preventDefault(); // Prevent the default pinch zoom gesture
      this.pinchSubject.next(event); // Emit the pinch event for further processing
    }
  }

  onMouseDown(event: MouseEvent): void {
    event?.preventDefault();
    this.isMousePressed = true;
    this.lastMouseX = event?.clientX;
    this.lastMouseY = event?.clientY;
  }

  onMouseMove(event: MouseEvent): void {
    event?.preventDefault();
    if (this.isMousePressed) {
      const offsetX = event?.clientX - this.lastMouseX;
      const offsetY = event?.clientY - this.lastMouseY;
      this.panOffsetX += offsetX;
      this.panOffsetY += offsetY;
      this.lastMouseX = event?.clientX;
      this.lastMouseY = event?.clientY;
      this.onDrawCanvas(this.imageUrl);
    }
  }

  onMouseUp(event: MouseEvent): void {
    event?.preventDefault();
    this.isMousePressed = false;
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.onDrawCanvas(this.imageUrl); // Trigger a canvas redraw with the updated pan offset
      });
    }, 1000);
  }

  onMouseLeave(event: MouseEvent): void {
    event?.preventDefault();
    this.isMousePressed = false;
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.onDrawCanvas(this.imageUrl); // Trigger a canvas redraw with the updated pan offset
      });
    }, 5000);
  }

  handleZoom(event: WheelEvent): void {
    event?.preventDefault();

    const zoomDelta = -Math.sign(event.deltaY) * this.zoomStep; // Reverse the sign of zoomDelta
    const prevZoomLevel = this.zoomLevel;
    this.zoomLevel = Math.max(1, this.zoomLevel * this.zoomFactor ** zoomDelta);

    // Adjust the pan offset to keep the zoom centered
    const rect = this.canvas?.getBoundingClientRect();
    const mouseX = event?.clientX - rect?.left;
    const mouseY = event?.clientY - rect?.top;
    const scaleRatio = this.zoomLevel / prevZoomLevel;
    this.panOffsetX = mouseX - (mouseX - this.panOffsetX) * scaleRatio;
    this.panOffsetY = mouseY - (mouseY - this.panOffsetY) * scaleRatio;

    this.onDrawCanvas(this.imageUrl);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onStartRendering(matData: any): void {
    this.onSetData(matData)
      // eslint-disable-next-line unused-imports/no-unused-vars
      .then((canvas: HTMLCanvasElement) => {
        // this.canvasRefView.nativeElement.innerHTML = '';
        // this.canvasRefView.nativeElement.appendChild(canvas as HTMLCanvasElement);
      })
      .catch(() => {});
  }

  onSetData(matData:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getImageAndCellDim(matData).then(() => {
        this.onConstructMatrix(matData)
          .then((data) => {
            resolve(data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    });
  }

  private getImageAndCellDim(matData:ImageOverlayData): Promise<void> {
    return new Promise((resolved, rejected) => {
      const imageIns = new Image();
      imageIns.style.objectFit = 'contain';
      imageIns.onload = () => {
        this.imageDim.h = imageIns?.naturalHeight;
        this.imageDim.w = imageIns?.naturalWidth;
        resolved();
      };
      imageIns.onerror = (error) => {
        console.error(error);
      };
      imageIns.src = matData?.imageUrl;
    });
  }

  private onConstructMatrix(matData:ImageOverlayData) {
    return new Promise((resolved, rejected) => {
      requestAnimationFrame(() => {
        this.onDrawCanvas(this.imageUrl);
      });
    });
  }

  onCalculateCanvasDimension(): Dim {
    const viewWidth = this.canvasRefView?.nativeElement?.parentElement?.parentElement?.offsetWidth ?? 0 > this.imageDim?.w
      ? this.imageDim?.w ?? 0
      : this.canvasRefView.nativeElement.parentElement?.parentElement?.offsetWidth ?? 0;
    const viewHeight = this.canvasRefView?.nativeElement?.parentElement?.parentElement?.offsetHeight ?? 0 > this.imageDim?.h
      ? this.imageDim?.h ?? 0
      : this.canvasRefView.nativeElement?.parentElement?.parentElement?.offsetHeight ?? 0;
    const renderedWidth = !this.matData?.isImageDimUsed ? this.imageDim?.w : viewWidth; // Replace w2 with the actual rendered width
    const renderedHeight = !this.matData?.isImageDimUsed ? this.imageDim?.h : viewHeight; // Replace h2 with the actual rendered height

    // Calculate the scaling factors for width and height
    const scaleX = viewWidth / renderedWidth;
    const scaleY = viewHeight / renderedHeight;

    // Calculate the scaling factor that maintains the aspect ratio
    const scale = Math.min(scaleX, scaleY);

    // Calculate the new width and height of the canvas
    const canvasWidth = this.matData?.isZoomPanAllowd ? renderedWidth : renderedWidth * scale;
    const canvasHeight = this.matData?.isZoomPanAllowd ? renderedHeight : renderedHeight * scale;
    return {
      w: canvasWidth + 600,
      h: canvasHeight + 300,
    };
  }
  onDrawCanvas(imageUrl: string) {
    const dim = this.onCalculateCanvasDimension();
    const image = new Image(dim?.w, dim?.h);
    image.style.objectFit = 'contain';
    image.onload = () => {
      this.canvas.width = dim?.w;
      this.canvas.height = dim?.h;

      const centerX = (this.canvas.width - (image.width - 500)) / 2;
      const centerY = (this.canvas.height - (image.height - 200)) / 2;

      console.log(centerX, centerY);

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.rect(centerX, centerY, image.width - 500, image.height - 200);
      this.ctx.save();
      this.ctx.translate(this.panOffsetX, this.panOffsetY);

      if (this.matData?.isZoomPanAllowd) {
        this.ctx.scale(this.zoomLevel, this.zoomLevel);
      } else {
        this.ctx.scale(this.zoomLevel, this.zoomLevel);
      }

      // First Render the Image
      console.log(image);
      this.ctx?.drawImage(image, centerX, centerY, image.width - 500, image.height - 200);

      this.ctx.strokeStyle = 'transparent';
      this.ctx.stroke();
      this.ctx.restore();
    };

    image.onerror = (error) => {
      console.error(error);
    };

    image.src = imageUrl;
  }

  onToggleExpandCollapse():void {
    this.matRef.close();
  }

  getImagePath():string {
    if (!this.isExpanded) {
      return 'assets/images/collapsed.svg';
    }
    return 'assets/images/expanded.svg';
  }
}
