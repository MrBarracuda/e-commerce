import Container from "@/components/container";

export default function Order() {
  //TODO: display a list of placed (paid) orders and their status
  return (
    <Container>
      <h2 className="bg-background">Payment was succesfull</h2>
      <p className="text-foreground">Thank you !</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur at
        atque consequatur cumque error eum ipsa laudantium magni maiores maxime
        necessitatibus pariatur perspiciatis quas qui repellat, similique soluta
        tempore totam!
      </p>
    </Container>
  );
}
