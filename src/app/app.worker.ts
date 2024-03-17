/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;

  let ans  = 0 ;

  for(let i=0;i<10000000;i++) {
     ans+=i;
  }




  postMessage(ans);
});
