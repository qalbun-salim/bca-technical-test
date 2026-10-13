import { Card } from "../ui/card";
import { Button } from "../ui/button";
import FilterInputDropdown from "./FilterInputDropdown";

export default function MovieFilterCard() {
  return (
    <Card className="bg-card p-16 flex-row items-end">
      <FilterInputDropdown label="Genre" />
      <FilterInputDropdown label="Release Year" />
      <FilterInputDropdown label="Minimum Rating" />
      <Button>Apply Filters</Button>
      <Button>Clear All</Button>
    </Card>
  );
}
