import React, { useRef, useState, useEffect } from "react";
import { X } from 'lucide-react';
import { Save } from 'lucide-react';
import { FileUp } from 'lucide-react';
import { Upload } from 'lucide-react';


export default function PopupTemplate() {
  // popups
  const [showIntro, setShowIntro] = useState(false);
  const [dontShow, setDontShow] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);

  // file
  const [imageUrl, setImageUrl] = useState(null);
  const [isPDF, setIsPDF] = useState(false);
  const fileInputRef = useRef(null);

  // drawing/boxes
  const containerRef = useRef(null);
  const [boxes, setBoxes] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [startPt, setStartPt] = useState(null);
  const [currentBox, setCurrentBox] = useState(null);

  // move/resize
  const [activeIndex, setActiveIndex] = useState(null);
  const [mode, setMode] = useState(null); // 'move' or 'tl'|'t'|'tr'|'r'|'br'|'b'|'bl'|'l'
  const [anchor, setAnchor] = useState(null); // original box at interaction start

  // lock body scroll when modal open
  useEffect(() => {
    if (showBuilder || showIntro) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showBuilder, showIntro]);

  // Always show instructions when pressing the button
  const handleOpen = () => {
    setShowIntro(true);
  };
  const handleIntroContinue = () => {
    if (dontShow) localStorage.setItem("tmpl_intro_skip", "1");
    setShowIntro(false);
    setShowBuilder(true);
  };
  const closeAll = () => {
    setShowIntro(false);
    setShowBuilder(false);
  };

  // Upload
  const onPickFile = () => fileInputRef.current?.click();
  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const pdf =
      f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    setIsPDF(pdf);
    const url = URL.createObjectURL(f);
    setImageUrl(url);
    setBoxes([]);
  };

  // Helpers
  const clampBox = (x, y, w, h, rect) => {
    const nx = Math.max(0, Math.min(x, rect.width));
    const ny = Math.max(0, Math.min(y, rect.height));
    const nw = Math.max(0, Math.min(w, rect.width - nx));
    const nh = Math.max(0, Math.min(h, rect.height - ny));
    return { x: nx, y: ny, w: nw, h: nh };
  };

  const getPointFromEvent = (evt) => {
    const e = evt.touches?.[0] ?? evt.changedTouches?.[0] ?? evt;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    return { x, y, rect };
  };

  // Create box (mouse/touch)
  const onCanvasPointerDown = (evt) => {
    if (!imageUrl || isPDF) return;
    const role = evt.target.dataset.role;
    if (role === "box" || role === "handle") return;
    const { x, y } = getPointFromEvent(evt);
    setDrawing(true);
    setStartPt({ x, y });
    setCurrentBox({ x, y, w: 0, h: 0 });
    setActiveIndex(null);
  };
  const onCanvasPointerMove = (evt) => {
    if (drawing && startPt) {
      const { x, y } = getPointFromEvent(evt);
      const w = Math.abs(x - startPt.x);
      const h = Math.abs(y - startPt.y);
      const bx = Math.min(x, startPt.x);
      const by = Math.min(y, startPt.y);
      setCurrentBox({ x: bx, y: by, w, h });
    } else if (mode && activeIndex != null && anchor) {
      const { x, y, rect } = getPointFromEvent(evt);
      const dx = x - startPt.x;
      const dy = y - startPt.y;
      let nx = anchor.x,
        ny = anchor.y,
        nw = anchor.w,
        nh = anchor.h;

      const resize = (edge) => {
        if (edge.includes("l")) {
          nx = Math.min(anchor.x + anchor.w - 4, anchor.x + dx);
          nw = anchor.w + (anchor.x - nx);
        }
        if (edge.includes("r")) {
          nw = Math.max(4, anchor.w + dx);
        }
        if (edge.includes("t")) {
          ny = Math.min(anchor.y + anchor.h - 4, anchor.y + dy);
          nh = anchor.h + (anchor.y - ny);
        }
        if (edge.includes("b")) {
          nh = Math.max(4, anchor.h + dy);
        }
      };

      if (mode === "move") {
        nx = anchor.x + dx;
        ny = anchor.y + dy;
      } else {
        resize(mode);
      }

      const clamped = clampBox(nx, ny, nw, nh, rect);
      setBoxes((prev) =>
        prev.map((b, i) => (i === activeIndex ? { ...b, ...clamped } : b))
      );
    }
  };
  const endInteractions = () => {
    if (drawing && currentBox) {
      if (currentBox.w > 4 && currentBox.h > 4)
        setBoxes((p) => [...p, currentBox]);
    }
    setDrawing(false);
    setStartPt(null);
    setCurrentBox(null);
    setMode(null);
    setAnchor(null);
    setActiveIndex(null);
  };

  // Move/resize starters (mouse/touch)
  const startMove = (index, evt) => {
    evt.stopPropagation();
    setActiveIndex(index);
    setMode("move");
    setStartPt(getPointFromEvent(evt));
    setAnchor({ ...boxes[index] });
  };
  const startResize = (index, handle, evt) => {
    evt.stopPropagation();
    setActiveIndex(index);
    setMode(handle);
    setStartPt(getPointFromEvent(evt));
    setAnchor({ ...boxes[index] });
  };

  const removeBox = (idx) =>
    setBoxes((prev) => prev.filter((_, i) => i !== idx));
  const clearBoxes = () => setBoxes([]);
  const onSaveTemplate = () => {
    console.log("Template boxes:", boxes);
    alert("Saved! Coordinates logged to console.");
  };

  return (
    <div className="w-full">
      {/* Launcher */}
      <button
        onClick={handleOpen}
        className="rounded-lg flex gap-2 items-center bg-blue-900 px-4 py-2 text-white shadow hover:bg-blue-600 active:scale-[0.99]"
      >
             <Upload size={18}/>Template
      </button>

      {/* Intro modal */}
      {showIntro && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-800">How to use</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
              <li>Click Continue to open the template builder.</li>
              <li>Upload a sample image or PDF.</li>
              <li>
                Drag to draw boxes; drag corners/edges to resize; drag inside to
                move.
              </li>
              <li>Save to capture coordinates.</li>
            </ol>
            <div className="mt-4 flex items-center gap-2">
              <input
                id="dont-show"
                type="checkbox"
                checked={dontShow}
                onChange={(e) => setDontShow(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-900 focus:ring-blue-600"
              />
              <label htmlFor="dont-show" className="text-sm text-slate-700">
                Don&apos;t show this again
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={closeAll}
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleIntroContinue}
                className="rounded-lg bg-blue-900 px-4 py-2 text-white hover:bg-blue-600"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Builder modal */}
      {showBuilder && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/60 p-2 sm:p-4">
          <div
            className="
              flex w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl
              max-h-[92vh]
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-3 py-2 sm:px-4">
              <h3 className="text-base font-semibold text-slate-800 sm:text-lg">
                Template Builder
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={onPickFile}
                  className="text-sm text-slate-700"
                >
    <FileUp />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  hidden
                  onChange={onFileChange}
                />

                <button
                  onClick={onSaveTemplate}
                  className="text-sm text-slate-700"
                >
                      <Save/>

                </button>
                <button
                  onClick={closeAll}
                  className="   text-sm text-slate-700 "
                >
                   <X />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="flex w-full flex-col sm:flex-row">
                {/* Canvas area */}
                <div
                  className="
                    flex-1 select-none bg-slate-100
                    overflow-auto
                    min-h-[50vh]
                  "
                  onMouseMove={onCanvasPointerMove}
                  onMouseUp={endInteractions}
                  onMouseLeave={endInteractions}
                  onTouchMove={onCanvasPointerMove}
                  onTouchEnd={endInteractions}
                  onTouchCancel={endInteractions}
                >
                  {!imageUrl ? (
                    <div className="flex h-full items-center justify-center p-6 text-center text-slate-500">
                      <p className="text-sm">
                        Upload an example file to begin drawing boxes.
                      </p>
                    </div>
                  ) : isPDF ? (
                    <div className="flex h-full items-center justify-center p-2">
                      <embed
                        src={imageUrl}
                        type="application/pdf"
                        className="w-full rounded-md border h-[70vh] sm:h-[80vh]"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center p-2">
                      <div
                        ref={containerRef}
                        className="relative overflow-hidden rounded-md border bg-white touch-none"
                        onMouseDown={onCanvasPointerDown}
                        onTouchStart={onCanvasPointerDown}
                      >
                        <img
                          src={imageUrl}
                          alt="template"
                          className="
                            block max-w-[92vw] sm:max-w-[90vw]
                            max-h-[70vh] sm:max-h-[80vh]
                          "
                          draggable={false}
                        />

                        {/* Existing boxes */}
                        {boxes.map((b, i) => (
                          <div
                            key={i}
                            data-role="box"
                            className="group absolute cursor-move rounded border-2 border-blue-900 bg-blue-900/10"
                            style={{
                              left: b.x,
                              top: b.y,
                              width: b.w,
                              height: b.h,
                            }}
                            onMouseDown={(e) => startMove(i, e)}
                            onTouchStart={(e) => startMove(i, e)}
                            onTouchMove={onCanvasPointerMove}
                            onTouchEnd={endInteractions}
                            title="Drag to move; use handles to resize"
                          >
                            {/* Remove */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeBox(i);
                              }}
                              className="absolute -right-6 -top-6 grid h-6 w-6 place-items-center rounded-full bg-red-600 text-white text-xs"
                              title="Remove"
                            >
                              ×
                            </button>

                            {/* Resize handles */}
                            {[
                              [
                                "tl",
                                "top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize",
                              ],
                              [
                                "t",
                                "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize",
                              ],
                              [
                                "tr",
                                "top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize",
                              ],
                              [
                                "r",
                                "top-1/2 right-0 translate-x-1/2 -translate-y-1/2 cursor-ew-resize",
                              ],
                              [
                                "br",
                                "bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize",
                              ],
                              [
                                "b",
                                "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize",
                              ],
                              [
                                "bl",
                                "bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize",
                              ],
                              [
                                "l",
                                "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize",
                              ],
                            ].map(([handle, pos]) => (
                              <span
                                key={handle}
                                data-role="handle"
                                onMouseDown={(e) => startResize(i, handle, e)}
                                onTouchStart={(e) =>
                                  startResize(i, handle, e)
                                }
                                onTouchMove={onCanvasPointerMove}
                                onTouchEnd={endInteractions}
                                className={[
                                  "absolute h-3 w-3 rounded bg-blue-900 shadow",
                                  "opacity-0 group-hover:opacity-100 transition",
                                  pos,
                                ].join(" ")}
                              />
                            ))}
                          </div>
                        ))}

                        {/* Drawing preview */}
                        {currentBox && (
                          <div
                            className="absolute rounded border-2 border-blue-900 bg-blue-600"
                            style={{
                              left: currentBox.x,
                              top: currentBox.y,
                              width: currentBox.w,
                              height: currentBox.h,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Side panel */}
                <aside
                  className="
                    w-full sm:w-80 border-t sm:border-l sm:border-t-0 p-3
                    max-h-[40vh] sm:max-h-none
                    overflow-y-auto
                  "
                >
                  <div className="flex  justify-between items-center">
                    <h4 className=" font-semibold text-md text-slate-800">
                      Selections
                    </h4>
                    <button
                      onClick={clearBoxes}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Clear boxes
                    </button>
                  </div>
                  {boxes.length === 0 ? (
                    <p className="text-sm mt-3 text-slate-500">
                      No boxes yet. Drag on the image to add.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {boxes.map((b, i) => (
                        <li
                          key={i}
                          className="rounded mt-3 border border-slate-200 bg-white p-2 text-xs text-slate-700"
                        >
                          Box {i + 1}: x={Math.round(b.x)}, y=
                          {Math.round(b.y)}, w={Math.round(b.w)}, h=
                          {Math.round(b.h)}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 rounded bg-blue-50 p-2 text-xs text-blue-900">
                    Tip: Drag corners/edges to resize; drag inside to move;
                    boxes stay within the image.
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
