// src/components/OrderForm.tsx

interface OrderFormProps {
  onSubmit: (value: string) => void;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const handleSubmit = (formData: FormData) => {
    const value = formData.get("value") as string;
    if (value === "") {
      alert("Please enter search topic!");
      return;
    }
    onSubmit(value);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="value" defaultValue="John Doe" />
      <button type="submit">Place order</button>
    </form>
  );
}
