import React from 'react';

export default function Loading() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .loader-bg {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #eaecfa;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader {
          width: 250px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          position: relative;
          font-family: helvetica, arial, sans-serif;
          text-transform: uppercase;
          font-weight: 900;
          color: #ce4233;
          letter-spacing: 0.2em;
        }
        
        .loader::before, .loader::after {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          background: #ce4233;
          position: absolute;
          animation: load .7s infinite alternate ease-in-out;
        }
        
        .loader::before {
          top: 0;
        }
        
        .loader::after {
          bottom: 0;
        }

        @keyframes load {
          0% { left: 0; height: 30px; width: 15px }
          50% { height: 8px; width: 40px }
          100% { left: 235px; height: 30px; width: 15px}
        }
      `}} />
      <div className="loader-bg">
        <div className="loader">speedup...</div>
      </div>
    </>
  );
}
