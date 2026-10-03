import { translateToBaybayin } from "../utils/baybayin";

function Footer() {
  return (
    <footer className="flex justify-between gap-4 py-4">
      <p>Tuklas Pilipinas {new Date().getFullYear()}</p>
      <p className="font-baybayin">{translateToBaybayin("Pilipinas")}</p>
    </footer>
  );
}

export default Footer;
