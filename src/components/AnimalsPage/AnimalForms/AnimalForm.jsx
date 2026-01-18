import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../../styles/main.scss";

function ContactHookForm({cages, initialData = {}, onSubmitBook, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setValue("name", initialData.name || "");
      setValue("species", initialData.species || "");
      setValue("mass", initialData.mass || "");
      setValue("cageId", initialData.cage?.id ?? "");
    }
  }, [initialData, setValue]);


  const onSubmit = (data) => {
    const animal = {
      id: initialData?.id,
      name: data.name,
      species: data.species,
      mass: data.mass,
      cageId: data.cageId ? Number(data.cageId) : null,
    };
  
    onSubmitBook(animal);
    reset();
  };
  

  return (
    <form className="formaDodaj" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input
          type="text"
          {...register("name", {
            required: "Obavezno je uneti naziv zivotinje!",
          })}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </label>
      <br />

      <label>
      Species:
        <input
          type="text"
          {...register("species", {
            required: "Obavezno je uneti vrstu zivotnje!",
          })}
        />
        {errors.pageCount && <p className="error">{errors.pageCount.message}</p>}
      </label>
      <br />

      <label>
      Mass (kg):
      <input 
        type="number" 
        step="0.01" 
        {...register("mass", { 
            required: "Obavezno je uneti tezinu!",
            valueAsNumber: true, // automatski konvertuje string u number
            min: { value: 0, message: "Tezina mora biti pozitivna." }, 
            })} />
        {errors.publishedDate && <p className="error">{errors.publishedDate.message}</p>}
      </label>
      <br />
      
      <label>
        Cage:
        <select
          {...register("cageId")}
          defaultValue={initialData?.cageId ?? ""}
        >
          <option value="">-- Bez kaveza --</option>
          {cages.map((cage) => (
            <option key={cage.id} value={cage.id}>
              {cage.code}
            </option>
          ))}
        </select>
      </label>
      <br />




      <button type="submit">
        {initialData && initialData.id ? "Sačuvaj izmene" : "Dodaj zivotinju"}
      </button>

      {initialData && initialData.id && (
        <button type="button" onClick={onCancel}>
          Otkaži
        </button>
      )}
    </form>

  );
}

export default ContactHookForm;
