type Props = {
  children: React.ReactNode;
  fromMe?: boolean;
};
const Message = ({ children, fromMe = false }: Props) => {
  const className = `w-3/4 max-w-lg  rounded-lg border border-black px-4 py-2 text-lg text-gray-900 whitespace-pre-line ${
    fromMe
      ? "bg-gradient-to-b from-white to-gray-200 rounded-tr-none"
      : "bg-gradient-to-b from-white to-[#90dc4c] rounded-tl-none"
  }`;
  return <div className={className}>{children}</div>;
};

export default Message;
