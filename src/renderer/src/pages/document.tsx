import { useParams } from "react-router-dom";
import { Editor, OnContentUpdatedProps } from "../components/editor";
import { ToC } from "../components/ToC";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { Document as IPCDocument } from "~/src/shared/types/ipc";

export function Document() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const response = await window.api.fetchDocument({ id: id! });

      return response.data;
    },
  });

  const { mutate: saveDocument } = useMutation({
    mutationFn: async ({ title, content }: OnContentUpdatedProps) => {
      await window.api.saveDocument({
        id: id!,
        title,
        content,
      });
    },
    onSuccess: (_, { content, title }) => {
      queryClient.setQueryData<IPCDocument[]>(["documents"], (documents) => {
        return documents?.map((document) => {
          if (document.id === id) {
            return {
              ...document,
              title,
            };
          }

          return document
        });
      });
    },
  });

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? "<p></p>"}`;
    }
  }, [data]);

  function handleEditorContentUpdated({
    title,
    content,
  }: OnContentUpdatedProps) {
    saveDocument({
      content,
      title,
    });
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs">
          TABLE OF CONTENTS
        </span>

        <ToC.Root>
          <ToC.Link>Back-end</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco de dados</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && !!initialContent && (
          <Editor
            content={initialContent}
            onContentUpdated={handleEditorContentUpdated}
          />
        )}
      </section>
    </main>
  );
}
