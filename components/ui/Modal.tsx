"use client";

import { useEffect, useRef, useState, type FormEvent, type MouseEvent, type ReactNode, type SyntheticEvent } from "react";

type ModalProps = {
  /** Header center label, e.g. "Agregar niño". */
  title: string;
  /** Content of the opening <button>. */
  trigger: ReactNode;
  /** Classes for that <button>. */
  triggerClassName: string;
  /** Returns true to close the modal, false to keep it open (validation or save errors). */
  onSave: (formData: FormData) => Promise<boolean>;
  /** Called after every close, so the caller can clear its own state (errors). */
  onClose?: () => void;
  /** ModalRow elements. */
  children: ReactNode;
};

/** True when some control differs from its default: a non-empty text field, or a non-default select. */
function isFormDirty(form: HTMLFormElement): boolean {
  for (const element of Array.from(form.elements)) {
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      if (element.value !== element.defaultValue) return true;
    } else if (element instanceof HTMLSelectElement) {
      const selected = element.selectedOptions[0];
      if (selected !== undefined && !selected.defaultSelected) return true;
    }
  }
  return false;
}

export function Modal({ title, trigger, triggerClassName, onSave, onClose, children }: ModalProps) {
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mouseDownTargetRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog === null) return;
    if (!open || dialog.open) return;
    dialog.showModal();
    // `showModal()` would land on the header's "Cancelar"; focus the first field instead (criterion 1.3).
    const form = formRef.current;
    if (form === null) return;
    const field = Array.from(form.elements).find(
      (element) =>
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement,
    );
    if (field instanceof HTMLElement) field.focus();
  }, [open]);

  function close() {
    dialogRef.current?.close();
  }

  function requestClose() {
    if (saving) return;
    const form = formRef.current;
    if (form !== null && isFormDirty(form)) {
      setConfirming(true);
    } else {
      close();
    }
  }

  function handleDialogClose() {
    formRef.current?.reset();
    setConfirming(false);
    setOpen(false);
    onClose?.();
  }

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    if (saving) return;
    if (confirming) {
      setConfirming(false);
      return;
    }
    requestClose();
  }

  function handleMouseDown(event: MouseEvent<HTMLDialogElement>) {
    mouseDownTargetRef.current = event.target;
  }

  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (saving || confirming) return;
    const dialog = dialogRef.current;
    if (dialog === null) return;
    // Only a press and a click both landing on the <dialog> itself count as an outside click (the card fills it).
    if (event.target !== dialog || mouseDownTargetRef.current !== dialog) return;
    requestClose();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (saving || form === null) return;
    setSaving(true);
    const ok = await onSave(new FormData(form));
    setSaving(false);
    if (ok) close();
  }

  return (
    <>
      <button type="button" className={triggerClassName} onClick={() => setOpen(true)}>
        {trigger}
      </button>
      <dialog
        ref={dialogRef}
        onCancel={handleCancel}
        onClose={handleDialogClose}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        className="mx-auto mt-10 mb-auto w-[520px] max-w-[calc(100%-48px)] rounded-3xl border border-line bg-[#FBF4EC] p-0 text-ink shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)] backdrop:bg-[rgba(63,54,46,.35)]"
      >
        <form ref={formRef} noValidate onSubmit={handleSubmit}>
          <div className="flex items-center justify-between border-b border-line px-[26px] py-5">
            {confirming ? (
              <>
                <span />
                <span className="font-display text-[18px] font-semibold text-ink">{title}</span>
                <span />
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={requestClose}
                  className="cursor-pointer text-[15px] font-bold text-muted"
                >
                  Cancelar
                </button>
                <span className="font-display text-[18px] font-semibold text-ink">{title}</span>
                <button type="submit" className="cursor-pointer text-[15px] font-extrabold text-accent-text">
                  {saving ? "Guardando…" : "Guardar"}
                </button>
              </>
            )}
          </div>

          <div hidden={confirming} className="px-[26px] py-6">
            {children}
          </div>

          {confirming && (
            <div className="px-[26px] py-6">
              <div className="font-display text-[18px] font-semibold text-ink">¿Descartar los cambios?</div>
              <p className="mt-1.5 text-[14px] text-muted">Lo que escribiste se perderá.</p>
              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="cursor-pointer rounded-xl border-[1.5px] border-line bg-surface px-4 py-[9px] text-[14px] font-bold text-nav"
                >
                  Seguir editando
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="cursor-pointer rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.7)]"
                >
                  Descartar
                </button>
              </div>
            </div>
          )}
        </form>
      </dialog>
    </>
  );
}
