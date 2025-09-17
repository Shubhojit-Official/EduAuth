from .preprocessing import Preprocessor
from .ocr_engine import OcrEngine
import numpy as np

class CertificatePipeline:
    """
    High-level OCR pipeline for certificates.
    Combines preprocessing + OCR into a simple interface.
    """

    def __init__(self, mode: str = "auto", scale: float = 1.5, debug: bool = False, ocr_config: str = "--psm 6"):
        """
        Args:
            mode (str): OCR mode ("text", "signature", or "auto").
            scale (float): Resize factor for preprocessing.
            debug (bool): Save debug images if True.
            ocr_config (str): Tesseract configuration flags.
        """
        self.preprocessor = Preprocessor(scale=scale, debug=debug)
        self.ocr = OcrEngine(mode=mode, ocr_config=ocr_config, preprocessor=self.preprocessor)

    def run(self, img: np.ndarray) -> str:
        """
        Run full OCR pipeline on an image.

        Args:
            img (np.ndarray): Input image (BGR, as read by OpenCV).

        Returns:
            str: Extracted text.
        """
        return self.ocr.extract_text(img)
