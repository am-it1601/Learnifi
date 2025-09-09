export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import db from "@/lib/db";
import { Categories } from "./_components/categories";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import CoursesList from "@/components/courses-list";


// interface SearchPageProps {
//   searchParams: Promise<URLSearchParams>;
// }
interface SearchPageProps {
  searchParams: {
    title: string
    categoryId: string
  };
}


const Search = async ({ searchParams }: SearchPageProps) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  
  // const params = await searchParams;
  // const filters = Object.fromEntries(params.entries()) as {
  //   title?: string;
  //   categoryId?: string;
  // };

  const courses = await getCourses({
    userId,
    ...searchParams,
  });
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Search;
