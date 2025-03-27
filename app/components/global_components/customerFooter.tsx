import Image from "next/image";
import Link from "next/link";

export default function CustomerPageFooter({ siteMap }: any) {
  return (
    <footer className="mt-10 flex flex-col justify-center items-center w-full min-h-[15rem]">
      <div className="w-full px-4 py-2 bg-[var(--primary-blue)] lg:grid lg:grid-cols-3 flex flex-col justify-start items-center gap-x-2">
        <div className="flex flex-col justify-start items-start gap-y-4 w-[100%]">
          <Link href={"/"} className="w-max flex flex-row items-center gap-x-2">
            <Image
              width={1024}
              height={1024}
              src={"/trademarks/logo.png"}
              alt="logo"
              className="w-10 h-10"
            />
            <h4 className="lg:text-xl text-sm font-bold text-white">
              DV Unlimited
            </h4>
          </Link>
          <p className="w-full h-max text-sm text-white">{`Your trusted source for quality soaps. Discover our handcrafted and effective cleansers for a healthier, happier you.`}</p>
        </div>
        <div className="flex flex-col justify-start items-start gap-y-2 w-[100%]"></div>
        <div className="flex flex-col justify-start items-start gap-y-2 w-[100%]">
          <h4 className="lg:text-xl text-sm font-bold text-white">Site map</h4>
          <div className="w-full h-max lg:grid lg:grid-cols-2 gap-x-2 flex flex-col justify-start items-start">
            {siteMap.map((_linkItem: any, _idx: number) => (
              <Link
                key={_idx}
                href={_linkItem.link}
                className="text-white text-sm"
              >
                {_linkItem.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <p className="w-full text-center h-max bg-[var(--secondary-blue)] text-white py-2 px-2">
        &copy; 2025 DV Unlimited. All rights reserved.
      </p>
    </footer>
  );
}
