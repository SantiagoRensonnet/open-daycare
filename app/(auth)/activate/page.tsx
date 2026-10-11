import Link from "next/link";
import { AuthField } from "@/components/auth/AuthField";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";
import { CheckIcon, SunIcon } from "@/components/icons";
import { routes } from "@/lib/routes";

export default function ActivatePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBF4EC] p-[40px]">
      <div className="w-full max-w-[440px]">
        <div className="mb-[22px] flex size-[58px] items-center justify-center rounded-[18px] bg-[linear-gradient(155deg,#F8C3A8,#F2937A)] shadow-[0_12px_26px_-10px_rgba(238,129,100,.65)]">
          <SunIcon size={30} />
        </div>

        <h1 className="mb-[8px] font-display text-[32px] leading-[1.15] font-semibold text-ink">
          Te damos la bienvenida a OpenDayCare
        </h1>
        <p className="mb-[26px] text-[15.5px] leading-[1.55] text-muted">
          Te invitaron a seguir el día de tu hijo. Crea tu contraseña para activar la cuenta.
        </p>

        <div className="mb-[22px] flex items-center gap-[14px] rounded-[16px] border-[1.5px] border-[#EADFD0] bg-white px-[16px] py-[14px]">
          <div className="flex size-[44px] items-center justify-center rounded-full bg-[#A9D9E8] font-display text-[19px] font-semibold text-[#1F7A93]">
            M
          </div>
          <div>
            <div className="text-[13px] text-muted">Te invitaron a seguir a</div>
            <div className="font-display text-[17px] font-semibold text-ink">Mateo · Sala Soles</div>
          </div>
        </div>

        <div className="mb-[18px]">
          <AuthField id="code" label="CÓDIGO DE INVITACIÓN" variant="code" defaultValue="7K4P9" />
        </div>
        <div className="mb-[18px]">
          <AuthField
            id="email"
            label="EMAIL"
            type="email"
            defaultValue="lucia.fernandez@gmail.com"
          />
        </div>
        <div className="mb-[18px]">
          <AuthField id="password" label="CREAR CONTRASEÑA" type="password" defaultValue="contraseña" />
        </div>

        <label className="mb-[24px] flex cursor-pointer items-start gap-[12px] rounded-[14px] bg-[#FBF1D6] px-[16px] py-[14px]">
          <input type="checkbox" defaultChecked className="peer sr-only" />
          <span className="mt-[1px] hidden size-[24px] flex-none items-center justify-center rounded-[8px] bg-[#5FB97E] peer-checked:flex">
            <CheckIcon className="text-white" />
          </span>
          <span className="text-[14px] leading-[1.45] text-[#8A7234]">
            Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app.
          </span>
        </label>

        <AuthSubmitButton>Activar mi cuenta</AuthSubmitButton>

        <p className="mt-[22px] text-center text-[14.5px] text-muted">
          ¿Ya tienes cuenta?{" "}
          <Link href={routes.login} className="font-extrabold text-edit">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
