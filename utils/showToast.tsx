import { toast } from "sonner";

export const showToast = {
  success: (title: string, desc?: string, className?: string) => {
    toast.success(title, {
      description: desc,
      className: className ?? "!text-md !p-3",
    });
  },

  error: (title: string, desc?: string, className?: string) => {
    toast.error(title, {
      description: desc,
      className: className ?? "!text-md !p-3",
    });
  },

  warning: (title: string, desc?: string, className?: string) => {
    toast.warning(title, {
      description: desc,
      className: className ?? "!text-md !p-3",
    });
  },

  info: (title: string, desc?: string, className?: string) => {
    toast.info(title, {
      description: desc,
      className: className ?? "!text-md !p-3",
    });
  },

  default: (title: string, desc?: string, className?: string) => {
    toast(title, {
      description: desc,
      className: className ?? "!text-md !p-3",
    });
  },
};
