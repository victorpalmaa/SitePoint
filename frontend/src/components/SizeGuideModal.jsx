import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

const SizeGuideModal = ({ open, onOpenChange, product, imageSrc }) => {
  const isWearable = product && (product.category === "T-Shirts" || product.category === "Hoodies");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="duration-200">
        <DialogHeader>
          <DialogTitle>Provador virtual</DialogTitle>
          <DialogDescription>Tabela de tamanhos da peça</DialogDescription>
        </DialogHeader>
        {isWearable ? (
          <div className="space-y-2 text-sm text-slate-700">
            <p>Consulte a tabela de medidas para escolher o melhor tamanho.</p>
            <ul className="list-disc pl-5">
              <li>Camisetas: P, M, G, GG</li>
              <li>Moletom: Oversized Boxy</li>
            </ul>
            {imageSrc && (
              <img src={imageSrc} alt="Tabela de medidas" className="mt-4 w-full h-auto rounded" />
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-700">Este produto não possui tabela de tamanhos.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;