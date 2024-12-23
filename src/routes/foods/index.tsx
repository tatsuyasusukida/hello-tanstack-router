import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

const searchSchema = v.object({
  page: v.optional(v.fallback(v.number(), 1), 1),
  filter: v.optional(v.fallback(v.string(), ""), ""),
});

export const Route = createFileRoute("/foods/")({
  component: FoodsComponent,
  validateSearch: searchSchema,
});

function FoodsComponent() {
  type Food = {
    id: string;
    name: string;
    energy: number;
    protein: number;
    fat: number;
    carbohydrate: number;
    amount: number;
    unit: string;
  };

  const data: Food[] = [
    {
      id: "1",
      name: "りんご",
      energy: 52,
      protein: 0.26,
      fat: 0.17,
      carbohydrate: 14,
      amount: 100,
      unit: "g",
    },
    {
      id: "2",
      name: "バナナ",
      energy: 89,
      protein: 1.09,
      fat: 0.33,
      carbohydrate: 23,
      amount: 100,
      unit: "g",
    },
    {
      id: "3",
      name: "みかん",
      energy: 47,
      protein: 0.8,
      fat: 0.2,
      carbohydrate: 9.8,
      amount: 100,
      unit: "g",
    },
  ];

  const columns: ColumnDef<Food>[] = [
    {
      accessorKey: "name",
      header: "名称",
    },
    {
      header: "エネルギー",
      cell: ({ row }) => `${row.original.energy} kcal`,
    },
    {
      header: "たんぱく質",
      cell: ({ row }) => `${row.original.protein} g`,
    },
    {
      header: "脂質",
      cell: ({ row }) => `${row.original.fat} g`,
    },
    {
      header: "炭水化物",
      cell: ({ row }) => `${row.original.carbohydrate} g`,
    },
    {
      header: "質量",
      cell: ({ row }) => `${row.original.amount} ${row.original.unit} 当たり`,
    },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => {
        const food = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to={`${food.id}/edit`}>編集</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={`${food.id}/delete`}>削除</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const form = useForm({});
  const searchParams = Route.useSearch();

  useEffect(() => {
    form.setValue("keyword", searchParams.filter);
  }, [searchParams.filter]);

  return (
    <main className="container mx-auto px-4">
      <Breadcrumb className="my-4" aria-label="現在位置">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">ホーム</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>食品リスト</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="mb-4 text-xl">食品リスト</h1>
      <nav aria-label="ボタン" className="mb-4">
        <ul className="flex flex-wrap gap-2">
          <li>
            <Button variant="outline" asChild>
              <Link to="..">戻る</Link>
            </Button>
          </li>
        </ul>
      </nav>
      <Form {...form}>
        <form className="mb-4 flex w-full max-w-sm items-center space-x-2">
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} aria-label="キーワード"></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">検索</Button>
        </form>
      </Form>
      <DataTable data={data} columns={columns} className="mb-4"></DataTable>
      <Pagination className="mb-4" aria-label="ページ番号">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious>前ページ</PaginationPrevious>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink to="">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext>次ページ</PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
