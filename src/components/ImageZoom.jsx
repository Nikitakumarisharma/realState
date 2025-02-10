import { useRef, useEffect } from "react";

export default function ImageZoom() {
  const imgRef = useRef(null);
  const resultRef = useRef(null);
  const lensRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    const result = resultRef.current;

    if (!img || !result) return;

    const lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    img.parentElement.insertBefore(lens, img);
    lensRef.current = lens;

    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundImage = `url('${img.src}')`;
    result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

    function moveLens(e) {
      e.preventDefault();
      const pos = getCursorPos(e);
      let x = pos.x - lens.offsetWidth / 2;
      let y = pos.y - lens.offsetHeight / 2;

      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
      if (y < 0) y = 0;

      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;
      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    }

    function getCursorPos(e) {
      const a = img.getBoundingClientRect();
      const x = e.touches ? e.touches[0].pageX - a.left - window.pageXOffset : e.pageX - a.left - window.pageXOffset;
      const y = e.touches ? e.touches[0].pageY - a.top - window.pageYOffset : e.pageY - a.top - window.pageYOffset;
      return { x, y };
    }

    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    return () => {
      lens.remove();
    };
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row justify-center items-center gap-4">
      <div className="relative img-zoom-container">
        <img 
          ref={imgRef} 
          src="/assets/sec144.jpg" 
          width="300" 
          height="240" 
          alt="Zoomable" 
          className="rounded-lg shadow-md"
        />
      </div>
      <div 
        ref={resultRef} 
        className="border border-gray-300 shadow-lg w-[300px] h-[300px] bg-cover bg-center"
      ></div>
      <style>{`
        .img-zoom-lens {
          position: absolute;
          border: 1px solid #d4d4d4;
          width: 20px;
          height: 20px;
          text: red;
        }
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            align-items: center;
          }
          .img-zoom-result {
            width: 100% !important;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
}
