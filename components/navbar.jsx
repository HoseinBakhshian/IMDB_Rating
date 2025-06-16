import React from "react";
import Search from "../components/search";
import { useRouter } from "next/navigation";
import { Container } from "react-bootstrap";

function Navbar() {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/`);
  };

  return (
    <div className="navbar">
      <Container className="position-relative ">
        <div className=" position-absolute left-8 d-none d-md-block">
          <img src="/walter2.png" width={50} height={50}  onClick={handleClick} className="pointer" />
        </div>
        <Search />
      </Container>
    </div>
  );
}

export default Navbar;
