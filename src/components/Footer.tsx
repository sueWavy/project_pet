import zustand from "../assets/zustand.png";
import {
  SiReact,
  SiVite,
  SiTypescript,
  SiReactrouter,
  SiReactquery,
  SiAxios,
  SiYarn,
  SiGithub,
  SiNotion,
  SiPhpstorm,
  SiTailwindcss,
} from "react-icons/si";
import { TbBrandBlogger } from "react-icons/tb";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex justify-evenly  items-center w-full bg-slate-200 h-36 dark:bg-slate-800 dark:text-white md:flex-col">
      <div className="text-center">
        <p className="sm:text-sm">
          <b className="text-xl sm:text-base">MungMeeting</b>은 반려견을 키우는
          견주들을 위한 커뮤니티 사이트 프로젝트입니다.
        </p>
        <div className="flex items-center space-x-3 mt-2 text-2xl">
          <span className="sm:hidden text-lg">사용 기술 스택</span>
          <SiVite /> <SiReact /> <SiReactquery /> <SiTypescript />
          <SiReactrouter /> <SiAxios /> <SiYarn /> <SiGithub /> <SiNotion />{" "}
          <SiTailwindcss />
          <img src={zustand} className="w-12 h-12  object-scale-down" />
          <SiPhpstorm />
        </div>
      </div>
      <div className="text-2xl ml:hidden">
        <p className="text-lg border border-black dark:border-white text-center mb-3">
          TEAM
        </p>
        <div className="flex justify-evenly space-x-3">
          <span className="flex items-center">
            <FaUser className="mr-2" />
            FE 1
          </span>
          <span className="flex items-center">
            <FaUser className="mr-2" />
            BE 1
          </span>
        </div>
      </div>
      <div className="text-2xl md:hidden">
        <p className="text-lg border border-black dark:border-white text-center mb-3">
          CONTACT FE DEV
        </p>
        <div className="flex justify-evenly space-x-3">
          <a
            href="https://sue97.tistory.com/"
            target="_blank"
            className="flex items-center"
          >
            Blog
            <TbBrandBlogger className="ml-2" />
          </a>
          <a
            href="https://github.com/sueWavy"
            target="_blank"
            className="flex items-center"
          >
            GitHub
            <SiGithub className="ml-2" />
          </a>
          <a href="mailto:dlgbrkd123@gmail.com" className="flex items-center">
            Email
            <MdOutlineAlternateEmail className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
}
