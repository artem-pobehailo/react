export default function Forms() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username");
    const gdfgdfg = formData.get("gdfgdfg");
    const sasa = formData.get("sasa");
    console.log("usr", username);
    console.log("gdfgdfg", gdfgdfg);
    console.log("sasa", sasa);

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" />
      <input type="text" name="gdfgdfg" />
      <input type="text" name="sasa" />
      <button type="submit">Submit</button>
    </form>
  );
}
