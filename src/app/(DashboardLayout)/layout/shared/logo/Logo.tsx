'use client'
import { CustomizerContext } from "@/app/context/customizerContext";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import config from '@/app/context/config'
import Image from "next/image";
import { useContext } from "react";

const Logo = () => {
  const { isCollapse, isSidebarHover, activeDir, activeMode } = useContext(CustomizerContext);

  const TopbarHeight = config.topbarHeight;
  const logoSrc = "/images/logos/logo-v4.png";

  const LinkStyled = styled(Link)(() => ({
    height: TopbarHeight,
    width: isCollapse == "mini-sidebar" && !isSidebarHover ? '40px' : '180px',
    overflow: "hidden",
    display: "block",
  }));

  if (activeDir === "ltr") {
    return (
      <LinkStyled href="/">
        {activeMode === "dark" ? (
          <Image
            src={logoSrc}
            alt="logo"
            height={TopbarHeight}
            width={180}
            priority
          />
        ) : (
          <Image
            src={logoSrc}
            alt="logo"
            height={TopbarHeight}
            width={180}
            priority
          />
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled href="/">
      {activeMode === "dark" ? (
        <Image
          src={logoSrc}
          alt="logo"
          height={TopbarHeight}
          width={180}
          priority
        />
      ) : (
        <Image
          src={logoSrc}
          alt="logo"
          height={TopbarHeight}
          width={180}
          priority
        />
      )}
    </LinkStyled>
  );
};

export default Logo;
