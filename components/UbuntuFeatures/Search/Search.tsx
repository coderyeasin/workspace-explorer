import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const SearchBox = () => {
  return (
    <Field>
      {/* <FieldLabel htmlFor="input-button-group">Search</FieldLabel> */}
      <ButtonGroup className="flex justify-center text-black ">
        <Input
          id="input-button-group"
          className="max-w-xl bg-white shadow-none border-none focus-visible:right-0 focus-visible:outline-none focus-visible:border-none"
          placeholder="Type to search..."
        />
        <Button variant="outline" className={`cursor-pointer bg-white`}>
          Search
        </Button>
      </ButtonGroup>
    </Field>
  );
};
export default SearchBox;
