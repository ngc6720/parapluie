export default function () {
  let timeout: any = null;
  let ticking: boolean = false;

  return function (cb: Function, durationms: number) {
    timeout && clearTimeout(timeout);
    ticking = true;
    timeout = setTimeout(() => {
      ticking = false;
      timeout = null;
      cb();
    }, durationms);
    if (ticking) return;
    cb();
  };
}
