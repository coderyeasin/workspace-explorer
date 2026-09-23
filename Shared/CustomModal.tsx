"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface CustomModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  placeholder?: string;
  submitLabel?: string;
  onSubmit: (e: React.FormEvent) => Promise<void> | void;
}

const CustomModal = ({
  isOpen,
  onOpenChange,
  title,
  inputValue,
  onInputChange,
  placeholder = "Type here...",
  submitLabel = "Submit",
  onSubmit,
}: CustomModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white z-50">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 pt-2">
          <Input
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={placeholder}
            className="bg-zinc-800 border-zinc-700 text-white focus-visible:ring-amber-500"
            autoFocus
          />
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-zinc-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
