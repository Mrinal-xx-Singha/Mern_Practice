"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";

interface QRModalProps {
  open: boolean;
  onClose: () => void;
  shortUrl: string | null;
}

export default function QRModal({ open, onClose, shortUrl }: QRModalProps) {
  if (!shortUrl) return null;

  const downloadQR = () => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border border-slate-700 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">QR Code</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 mt-3">
          <QRCodeCanvas
            id="qr-canvas"
            value={shortUrl}
            size={220}
            bgColor="#0f172a"
            fgColor="#ffffff"
          />

          <Button
            className="bg-indigo-600 hover:bg-indigo-500"
            onClick={downloadQR}
          >
            Download QR
          </Button>

          <p className="text-sm text-slate-400 break-all text-center">
            {shortUrl}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
