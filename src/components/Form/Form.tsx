export default function Forms() {
  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const form = event.currentTarget;
  //     const formData = new FormData(form);
  //   const username = formData.get("username");
  //   const gdfgdfg = formData.get("gdfgdfg");
  //   const sasa = formData.get("sasa");
  //   console.log("usr", username);
  //   console.log("gdfgdfg", gdfgdfg);
  //   console.log("sasa", sasa);

  //     form.reset();

  const handleSubmit = (formData: FormData) => {
    const username = formData.get("username") as string;
    const gdfgdfg = formData.get("gdfgdfg") as string;
    const sasa = formData.get("sasa") as string;
    console.log("usr", username);
    console.log("gdfgdfg", gdfgdfg);
    console.log("sasa", sasa);
    console.log("form submit");
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input type="text" name="username" />
    //   <input type="text" name="gdfgdfg" />
    //   <input type="text" name="sasa" />
    //   <button type="submit">Submit</button>
    //   </form>
    <form action={handleSubmit}>
      <input type="text" name="username" defaultValue="John Doe" />
      <input type="text" name="gdfgdfg" defaultValue="John Doe" />
      <input type="text" name="sasa" defaultValue="John Doe" />
      <button type="submit">Submit</button>
    </form>
  );
}
