"use client";

import nameTag from "@/app/ui/nameTag";

type Props = {
  name: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const NameTag = (props: Props) => {
  return (
    <div
      className={props.className}
      onMouseOver={(e) => nameTag.create(props.name, e)}
      onMouseLeave={(e) => nameTag.remove()}
    />
  );
};

export default NameTag;
