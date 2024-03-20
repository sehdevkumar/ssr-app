import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core'

@Component({
  selector: 'custom-menu-item',
  imports: [],
  standalone: true,
  template: `<div>Hello world</div>`,
})
export class CustomMenuItem {
  text: string
}

@Component({
  selector: 'custom-menu',
  standalone: true,
  template: `<custom-menu-item #CustomMenuItem></custom-menu-item>`,
  imports: [CustomMenuItem],
})
export class CustomMenu  implements AfterContentInit{
  @ContentChildren(CustomMenuItem) items: QueryList<CustomMenuItem>
  ngAfterContentInit() {
    console.log(this.items)
    this.items.forEach((item) => {
      console.log(item)
    })
  }

  ngAfterViewInit(): void {

    console.log(this.items)

  }
}

@Component({
    selector: 'user-profile',
    template: `
    <custom-menu>
    </custom-menu>
  `,
    standalone: true,
    imports: [CustomMenu]
})
export class UserProfileComponent {}
