interface MailboxProps {
  username: string;
  messages: string[];
}

export default function Mailbox({ username, messages }: MailboxProps) {
  return (
    <>
      <p>Hello {username}</p>
      {messages.length > 0 && <p>You have {messages.length} unread messages</p>}
    </>
  );
}
