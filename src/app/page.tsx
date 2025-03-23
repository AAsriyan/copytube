import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-rose-500">Hello World</h1>
      <Image src="/logo.svg" alt="logo" width={50} height={50} />
      <p className="text-xl font-semibold tracking-tight">Copytube</p>
    </div>
  );
}
