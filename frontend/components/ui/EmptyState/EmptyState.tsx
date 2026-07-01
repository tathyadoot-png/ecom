import { FolderOpen } from "lucide-react";

import Typography from "../Typography/Typography";

interface Props {

  title: string;

  description: string;

}

export default function EmptyState({

  title,

  description,

}: Props) {

  return (

    <div className="py-20 flex flex-col items-center">

      <FolderOpen

        size={58}

        className="text-border"

      />

      <Typography

        as="h3"

        variant="title"

        className="mt-6"

      >

        {title}

      </Typography>

      <Typography

        variant="body"

        className="mt-2 text-center max-w-md"

      >

        {description}

      </Typography>

    </div>

  );

}