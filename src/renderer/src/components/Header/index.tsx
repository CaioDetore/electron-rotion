import clsx from "clsx";
import { Code, CaretDoubleRight, TrashSimple } from "phosphor-react";
import * as Breadcrumbs from "./Breadcrumbs";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Document } from "~/src/shared/types/ipc";

interface Props {
  isCollapsibleOpen: boolean;
}
export function Header({ isCollapsibleOpen }: Props) {
  const isMacOS = process.platform === "darwin";
  const isSidebarOpen = isCollapsibleOpen;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { mutate: deleteDocument, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      await window.api.deleteDocument({ id: id! });
    },
    onSuccess: () => {
      queryClient.setQueryData<Document[]>(["documents"], (documents) => {
        return documents?.filter((document) => document.id !== id);
      });

      navigate("/");
    },
  });

  return (
    <div
      id="header"
      className={clsx(
        "h-16 border-b border-rotion-600 py-4.5 px-6 flex items-center gap-4 leading-tight transition-all duration-250 region-drag",
        {
          "pl-24": !isSidebarOpen && isMacOS,
          "w-screen": !isSidebarOpen,
          "w-[calc(100vw-240px)]": isSidebarOpen,
        }
      )}
    >
      <CollapsibleTrigger
        className={clsx("h-5 w-5 text-rotion-200 hover:text-rotion-50", {
          hidden: isSidebarOpen,
          block: !isSidebarOpen,
        })}
      >
        <CaretDoubleRight className="h-4 w-4" />
      </CollapsibleTrigger>

      {!!id && (
        <>
          <Breadcrumbs.Root>
            <Breadcrumbs.Item>
              <Code weight="bold" className="h-4 w-4 text-pink-500" />
              Estrutura técnica
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.HiddenItems />
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>Back-end</Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item isActive>Untitled</Breadcrumbs.Item>
          </Breadcrumbs.Root>

          <div className="inline-flex region-no-drag">
            <button
              disabled={isDeleting}
              onClick={() => deleteDocument()}
              className="inline-flex items-center gap-1 text-rotion-100 text-sm hover:text-rotion-50"
            >
              <TrashSimple className="h-4 w-4" />
              Apagar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
