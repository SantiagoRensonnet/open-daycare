import Link from "next/link";
import { AuthField } from "@/components/auth/AuthField";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";
import { SunIcon } from "@/components/icons";
import { routes } from "@/lib/routes";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen grid-cols-[1.05fr_1fr] bg-[#FBF4EC]">
      <div className="relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(155deg,#F6A98E_0%,#F2937A_45%,#EC7E62_100%)] px-[60px] py-[56px] text-white">
        <div className="absolute -top-[140px] -right-[120px] size-[420px] rounded-full bg-[rgba(255,255,255,.12)]" />
        <div className="absolute -bottom-[110px] -left-[80px] size-[300px] rounded-full bg-[rgba(255,255,255,.10)]" />

        <div className="relative flex items-center gap-[13px]">
          <div className="flex size-[46px] items-center justify-center rounded-[14px] bg-[rgba(255,255,255,.22)]">
            <SunIcon size={26} />
          </div>
          <span className="font-display text-[21px] font-semibold tracking-[.5px]">OpenDayCare</span>
        </div>

        <div className="relative">
          <h1 className="mb-[18px] font-display text-[42px] leading-[1.12] font-semibold">
            El día de cada niño,
            <br />
            compartido con su familia.
          </h1>
          <p className="max-w-[430px] text-[17px] leading-[1.6] text-[rgba(255,255,255,.92)]">
            Publica momentos, gestiona las salas y mantén a las familias cerca, desde un solo lugar.
          </p>
        </div>

        <div className="relative text-[14px] text-[rgba(255,255,255,.9)]">
          🌿 Guardería Sala Soles
        </div>
      </div>

      <div className="flex items-center justify-center p-[40px]">
        <div className="w-full max-w-[392px]">
          <h2 className="mb-[6px] font-display text-[30px] font-semibold text-ink">Iniciar sesión</h2>
          <p className="mb-[28px] text-[15px] text-muted">Ingresa para ver el día de hoy.</p>

          <div className="mb-[18px]">
            <AuthField
              id="email"
              label="EMAIL"
              type="email"
              defaultValue="caro@opendaycare.com"
            />
          </div>
          <div className="mb-[10px]">
            <AuthField id="password" label="CONTRASEÑA" type="password" placeholder="••••••••" />
          </div>

          <div className="mb-[20px] text-right">
            <span className="cursor-pointer text-[13.5px] font-bold text-edit">
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          <AuthSubmitButton>Iniciar sesión</AuthSubmitButton>

          <p className="mt-[24px] text-center text-[14.5px] text-muted">
            ¿Te invitó la guardería?{" "}
            <Link href={routes.activate} className="font-extrabold text-edit">
              Activa tu cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
