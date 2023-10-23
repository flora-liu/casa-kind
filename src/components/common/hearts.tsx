"use client";

import React, { forwardRef, SVGProps, useEffect, useRef } from "react";
import gsap from "gsap";

const Heart1 = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        {...props}
        ref={ref}
        width="82"
        height="101"
        viewBox="0 0 82 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.473 2.24138C33.0665 2.24138 37.79 14.6851 40.4738 24.3156C42.4059 17.0657 45.4561 10.5478 46.2707 8.08402C47.881 3.21416 59.7235 -2.7536 72.035 3.86437C81.6966 9.05792 82.8237 28.2109 79.4422 36.9757C77.8849 41.0122 54.9661 81.1246 54 82.0984C53.0338 83.0723 42.4065 100.927 40.4738 100.602C38.9275 100.342 38.1119 98.546 37.8973 97.6803C35.643 95.7326 15.6757 63.2704 12.1331 56.7779C8.59388 50.2917 0.539586 32.1067 0.217533 25.9389C-0.10452 19.7711 6.98065 2.24138 21.473 2.24138Z"
          fill="#AD492F"
        />
      </svg>
    );
  }
);

Heart1.displayName = "Heart1";

const Heart2 = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        {...props}
        ref={ref}
        width="68"
        height="74"
        viewBox="0 0 68 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.59979 21.0108C15.2987 -4.6312 28.5596 5.5642 33.6027 13.8672C35.5268 9.87724 40.8394 1.64256 46.6975 0.623166C54.02 -0.651077 59.1173 1.868 65.8389 19.1814C71.2162 33.0322 57.8065 61.3664 50.4295 73.8021C29.1951 66.8892 -10.0991 46.6529 2.59979 21.0108Z"
          fill="#E89F88"
        />
      </svg>
    );
  }
);

Heart2.displayName = "Heart2";

const Heart3 = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        {...props}
        ref={ref}
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5136 1.17372C15.9662 0.28481 20.6979 4.64601 22.4611 6.68309C26.2329 4.42997 30.8711 0.618519 33.5926 0.155551C36.8584 -0.400014 42.6541 0.4334 44.3561 4.27606C46.058 8.11872 46.5639 11.4984 45.276 14.8318C44.2568 17.4696 20.4832 46.6375 20.0692 45.9894C19.6552 45.3412 12.1576 37.4707 7.37378 31.1743C2.59001 24.8779 -0.767825 15.7573 0.152131 9.46092C1.07209 3.16451 5.94785 2.28485 11.5136 1.17372Z"
          fill="#BD0A0E"
        />
      </svg>
    );
  }
);

Heart3.displayName = "Heart3";

const Heart4 = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        {...props}
        ref={ref}
        width="75"
        height="55"
        viewBox="0 0 75 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.86979 8.74241C23.0792 3.16351 33.1582 11.3929 35.8875 16.2911C38.7891 13.8943 38.1671 4.09324 56.2034 1.10741C72.1809 -1.5376 79.6747 16.4619 70.1284 33.0717C65.4682 41.18 54.8804 51.9658 42.3065 53.9939C31.9342 55.667 22.6889 51.246 16.4348 48.2554L16.331 48.2057C-1.99008 37.0742 -4.66632 14.057 8.86979 8.74241Z"
          fill="#DBB187"
        />
      </svg>
    );
  }
);

Heart4.displayName = "Heart4";

function Hearts() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heartsRefs = useRef<Array<SVGSVGElement | null>>([]);
  const heartsRefs2 = useRef<Array<SVGSVGElement | null>>([]);

  const tl = useRef<GSAPTimeline>();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power1" },
        repeat: -1,
        yoyo: true,
      });
      tl.addLabel("start")
        .to(heartsRefs.current, { scale: 1.3, rotate: 15 }, "start")
        .to(heartsRefs2.current, { scale: 0.6, rotate: -15 }, "start");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="z-20 relative sm:absolute w-full sm:w-1/2 right-0 top-0"
    >
      <div className="w-full h-full min-h-[16rem] md:min-h-[30rem] relative">
        <div className="absolute top-[85%] left-2/3 -rotate-6">
          <Heart1
            ref={(el) => (heartsRefs.current[0] = el)}
            className="w-5 h-5 md:w-11 md:h-11"
          />
        </div>
        <div className="absolute top-1/4 left-1/4">
          <Heart2
            ref={(el) => (heartsRefs2.current[0] = el)}
            className="w-5 h-5 md:w-11 md:h-11"
          />
        </div>
        <div className="absolute top-[128%] left-[80%] rotate-45">
          <Heart2
            ref={(el) => (heartsRefs2.current[1] = el)}
            className="w-6 h-6 md:w-9 md:h-9"
          />
        </div>
        <div className="absolute top-[10%] left-3/4 rotate-12">
          <Heart3
            ref={(el) => (heartsRefs2.current[2] = el)}
            className="w-5 h-5 md:w-11 md:h-11"
          />
        </div>
        <div className="absolute top-[110%] left-[40%] -rotate-12">
          <Heart3
            ref={(el) => (heartsRefs.current[1] = el)}
            className="w-5 h-5 md:w-11 md:h-11"
          />
        </div>
        <div className="absolute top-1/2 left-2/4 rotate-3">
          <Heart4
            ref={(el) => (heartsRefs.current[2] = el)}
            className="w-5 h-5 md:w-11 md:h-11"
          />
        </div>
        <div className="absolute top-[90%] left-[12%] rotate-[28deg]">
          <Heart4
            ref={(el) => (heartsRefs.current[3] = el)}
            className="w-6 h-6 md:w-9 md:h-9"
          />
        </div>
      </div>
    </div>
  );
}

Hearts.displayName = "Hearts";

export { Heart1, Heart2, Heart3, Heart4, Hearts };
