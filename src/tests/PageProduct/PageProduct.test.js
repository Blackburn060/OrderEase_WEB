import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PageProduct from "../../Components/ComponentPageProduct/pageProduct";

test("renders PageProduct component", () => {
    render(<PageProduct />);
    const pageTitle = screen.getByText("Produtos");
    expect(pageTitle).toBeInTheDocument();
  });
  
  test("handles product name input", () => {
    render(<PageProduct />);
    const productNameInput = screen.getByLabelText("Nome do Produto:");
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });
    expect(productNameInput.value).toBe("Test Product");
  });
  
  test("handles product description input", () => {
    render(<PageProduct />);
    const productDescriptionInput = screen.getByLabelText("Descrição:");
    fireEvent.change(productDescriptionInput, { target: { value: "Test Description" } });
    expect(productDescriptionInput.value).toBe("Test Description");
  });

  test("handles product category input", () => {
    render(<PageProduct />);
    const productCategoryInput = screen.getByLabelText("Categoria do Produto:");
    fireEvent.change(productCategoryInput, { target: { value: "Alcoólicos" } });
    expect(productCategoryInput.value).toBe("Alcoólicos");
  });
  
  test("handles product value input", () => {
    render(<PageProduct />);
    const productValueInput = screen.getByLabelText("Valor do Produto:");
    fireEvent.change(productValueInput, { target: { value: "100.00" } });
    expect(productValueInput.value).toBe("100.00");
  });
  
  test("handles product image input", () => {
    render(<PageProduct />);
    const file = new File(['(binary)'], 'LogoExemplo.png', { type: 'image/png' });
    const productImageInput = screen.getByLabelText("Imagem do Produto:");
    fireEvent.change(productImageInput, { target: { files: [file] } });
    expect(productImageInput.files[0]).toBe(file);
  });