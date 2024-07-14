import Link from "next/link";

export const NavigationBar = () => {
  return (
    <>
      <div className="flex justify-between bg-black text-white p-3 xl:text-3xl">
        <Link href={`/home`}>Logo</Link>
        <div className="flex gap-3">
          <Link href={`/home`}>Home</Link>
          <div>Contact</div>
        </div>
      </div>
    </>
  );
};
