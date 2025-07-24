"use client";
import { useEffect, useState } from "react";
import { fetchCategories } from "@/services/categories";
import { ICategory } from "@/interfaces/Category";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { BsCheckSquareFill } from "react-icons/bs";
import { ImCheckboxUnchecked } from "react-icons/im";

export type FilterProps = {
  onUpdateFilters: (updates: Record<string, string | null>) => void;
  currentParams: {
    [k: string]: string;
  };
};

export default function Categories({
  onUpdateFilters,
  currentParams,
}: FilterProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setSelectedSex(currentParams.sex ?? null);
    setSelectedCategory(currentParams.category ?? null);
    fetchCategories().then(setCategories);
  }, [currentParams.sex, currentParams.category]);

  function handleSexChange(sex: string) {
    const newSex = selectedSex === sex ? null : sex;
    setSelectedSex(newSex);
    setSelectedCategory(null);
    onUpdateFilters({
      sex: newSex,
      category: null,
    });
  }

  function handleCategoryChange(sex: string, categoryId: string) {
    const isSame = selectedCategory === categoryId && selectedSex === sex;
    const newCategory = isSame ? null : categoryId;
    const newSex = sex;

    setSelectedCategory(isSame ? null : categoryId);
    setSelectedSex(newSex);

    onUpdateFilters({
      sex: newSex,
      category: newCategory,
    });
  }

  const renderSexBlock = (sex: "male" | "female") => (
    <li>
      <div className="flex items-center gap-2 mb-2">
        {selectedSex === sex ? (
          <BsCheckSquareFill
            className="text-lg text-secondary cursor-pointer"
            onClick={() => handleSexChange(sex)}
          />
        ) : (
          <ImCheckboxUnchecked
            className="text-lg text-secondary-light cursor-pointer"
            onClick={() => handleSexChange(sex)}
          />
        )}
        <p>{sex === "male" ? "Men" : "Women"}</p>
      </div>
      <ul className="pl-5 space-y-1.5">
        {categories
          .filter((cat) => cat.sex === sex)
          .map((cat) => (
            <li className="flex items-center gap-2" key={cat._id}>
              {selectedCategory === cat._id ? (
                <MdRadioButtonChecked
                  className="text-lg text-secondary-light cursor-pointer"
                  onClick={() => handleCategoryChange(sex, cat._id)}
                />
              ) : (
                <MdRadioButtonUnchecked
                  className="text-lg text-secondary-light cursor-pointer"
                  onClick={() => handleCategoryChange(sex, cat._id)}
                />
              )}
              {cat.name}
            </li>
          ))}
      </ul>
    </li>
  );

  return (
    <div className="mb-4 mt-4">
      <h2 className="font-semibold mb-3">Categories</h2>
      <ul className="pl-5 text-sm space-y-4">
        {renderSexBlock("male")}
        {renderSexBlock("female")}
      </ul>
    </div>
  );
}
