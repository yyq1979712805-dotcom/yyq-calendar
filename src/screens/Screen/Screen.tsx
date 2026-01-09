import { RightSidebarSection } from "./sections/RightSidebarSection";

export const Screen = (): JSX.Element => {
  return (
    <div className="bg-[#1a1a2e] min-h-screen w-full flex items-center justify-center p-8">
      <div className="w-fit">
        <RightSidebarSection />
      </div>
    </div>
  );
};
