import { ref, defineComponent, h } from "vue";

const toasts = ref([]);
let nextId = 1;

export function useToast() {
  const showToast = (message, type = "info", timeout = 4000) => {
    const id = nextId++;
    toasts.value.push({ id, message, type });
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id);
    }, timeout);
  };

  const ToastComponent = defineComponent({
    setup() {
      return () =>
        h(
          "div",
          { class: "fixed top-5 right-5 space-y-2 z-50" },
          toasts.value.map(t =>
            h(
              "div",
              {
                key: t.id,
                class:
                  "px-4 py-2 rounded shadow text-white " +
                  (t.type === "success"
                    ? "bg-green-600"
                    : t.type === "error"
                    ? "bg-red-600"
                    : "bg-slate-600"),
              },
              t.message
            )
          )
        );
    },
  });

  return { showToast, ToastComponent };
}
