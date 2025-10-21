import { Input, Button } from "../atomic/atoms";

export default function SearchBar({ q, sort }: { q?: string; sort?: string }) {
  return (
    <form method="get" className="search-form">
      <Input type="text" name="q" placeholder="Search..." defaultValue={q ?? ""} />
      <select name="sort" defaultValue={sort ?? ""} className="select-basic">
        <option value="">Sort by...</option>
        <option value="price">Price ↑</option>
        <option value="price_desc">Price ↓</option>
      </select>
      <Button type="submit">Apply</Button>
    </form>
  );
}