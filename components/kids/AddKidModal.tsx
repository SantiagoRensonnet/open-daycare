"use client";

import { useState, type ReactNode } from "react";
import { createChild } from "@/app/(staff)/kids/actions";
import { ChevronDownIcon, PlusIcon } from "@/components/icons";
import { Modal } from "@/components/ui/Modal";
import { ModalRow } from "@/components/ui/ModalRow";
import { parseChildForm, readChildForm, type ChildFormError, type ChildFormErrors } from "@/lib/child-form";
import { dayKey } from "@/lib/dates";
import type { Classroom } from "@/lib/types";

const ERROR_MESSAGES: Record<Exclude<ChildFormError, "required">, string> = {
  "invalid-date": "Usa el formato dd/mm/aaaa con una fecha real.",
  future: "La fecha no puede ser futura.",
  "too-old": "La fecha no puede ser de hace más de 6 años.",
  "invalid-classroom": "Elige una sala.",
};

const REQUIRED_MESSAGES: Record<keyof ChildFormErrors, string> = {
  fullName: "Ingresa el nombre completo.",
  birthDate: "Ingresa la fecha de nacimiento.",
  classroomId: "Elige una sala.",
};

function messageFor(field: keyof ChildFormErrors, code: ChildFormError): string {
  return code === "required" ? REQUIRED_MESSAGES[field] : ERROR_MESSAGES[code];
}

const LABEL_CLASS = "mb-2 block text-[12px] font-extrabold tracking-[.7px] text-muted";
const CONTROL_CLASS =
  "w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-ink outline-none placeholder:text-[#B6A99B]";

function controlClass(hasError: boolean): string {
  return `${CONTROL_CLASS} ${hasError ? "border-accent-strong" : "border-[#EADFD0]"}`;
}

type FieldName = keyof ChildFormErrors;

function Field({
  name,
  label,
  error,
  children,
}: {
  name: string;
  label: string;
  error: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="flex-1">
      <label htmlFor={name} className={LABEL_CLASS}>
        {label}
      </label>
      {children}
      {error !== undefined && <p className="mt-1.5 text-[12.5px] font-bold text-accent-text">{error}</p>}
    </div>
  );
}

export function AddKidModal({
  classrooms,
  defaultClassroomId,
}: {
  classrooms: Classroom[];
  defaultClassroomId: string;
}) {
  const [errors, setErrors] = useState<ChildFormErrors>({});
  const [saveFailed, setSaveFailed] = useState(false);

  function clearError(field: FieldName) {
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function reset() {
    setErrors({});
    setSaveFailed(false);
  }

  async function save(formData: FormData): Promise<boolean> {
    const input = readChildForm(formData);
    const result = parseChildForm(input, dayKey(new Date()), classrooms.map((room) => room.id));
    if (!result.ok) {
      setErrors(result.errors);
      return false;
    }

    setSaveFailed(false);
    try {
      const response = await createChild(input);
      if (!response.ok) {
        setErrors(response.errors);
        return false;
      }
      return true;
    } catch {
      setSaveFailed(true);
      return false;
    }
  }

  const fullNameError = errors.fullName !== undefined ? messageFor("fullName", errors.fullName) : undefined;
  const birthDateError = errors.birthDate !== undefined ? messageFor("birthDate", errors.birthDate) : undefined;
  const classroomError = errors.classroomId !== undefined ? messageFor("classroomId", errors.classroomId) : undefined;

  return (
    <Modal
      title="Agregar niño"
      trigger={
        <>
          <PlusIcon size={17} />
          Agregar niño
        </>
      }
      triggerClassName="flex cursor-pointer items-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.7)]"
      onSave={save}
      onClose={reset}
    >
      <ModalRow>
        <Field name="fullName" label="NOMBRE COMPLETO" error={fullNameError}>
          <input
            id="fullName"
            name="fullName"
            autoComplete="off"
            placeholder="Ej. Martina López"
            aria-invalid={errors.fullName !== undefined}
            className={controlClass(errors.fullName !== undefined)}
            onChange={() => clearError("fullName")}
          />
        </Field>
      </ModalRow>

      <ModalRow>
        <Field name="birthDate" label="FECHA DE NACIMIENTO" error={birthDateError}>
          <input
            id="birthDate"
            name="birthDate"
            inputMode="numeric"
            placeholder="dd/mm/aaaa"
            aria-invalid={errors.birthDate !== undefined}
            className={controlClass(errors.birthDate !== undefined)}
            onChange={() => clearError("birthDate")}
          />
        </Field>
        <Field name="classroomId" label="SALA" error={classroomError}>
          <div className="relative">
            <select
              id="classroomId"
              name="classroomId"
              defaultValue={defaultClassroomId}
              aria-invalid={errors.classroomId !== undefined}
              className={`${controlClass(errors.classroomId !== undefined)} appearance-none pr-10 font-bold`}
              onChange={() => clearError("classroomId")}
            >
              {classrooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              size={16}
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-photo-fg"
            />
          </div>
        </Field>
      </ModalRow>

      <ModalRow>
        <Field name="allergies" label="ALERGIAS (ETIQUETAS)" error={undefined}>
          <input id="allergies" name="allergies" placeholder="Ej. Maní, Lactosa" className={controlClass(false)} />
        </Field>
      </ModalRow>

      <ModalRow>
        <Field name="notes" label="NOTAS MÉDICAS" error={undefined}>
          <textarea
            id="notes"
            name="notes"
            placeholder="Indicaciones, medicación, contactos…"
            className={`${controlClass(false)} min-h-[90px] resize-y leading-[1.5]`}
          />
        </Field>
      </ModalRow>

      {saveFailed && <p className="mt-4 text-[13px] font-bold text-accent-text">No se pudo guardar. Intenta de nuevo.</p>}
    </Modal>
  );
}
