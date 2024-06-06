// validateInput.test.ts
import { describe, it, expect, vi } from "vitest";
import { Request, Response } from "express";
import { z, AnyZodObject } from "zod";
import { validateInput } from "./validate-input";
import { StatusCodes } from "http-status-codes";

const mockRequest = (body: any = {}, query: any = {}, params: any = {}): Request =>
  ({
    body,
    query,
    params,
  } as Request);

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res as Response;
};

describe("validateInput Middleware", () => {
  it("should call next if validation passes", () => {
    const schema: AnyZodObject = z.object({
      name: z.string(),
      age: z.number().min(18),
    });

    const req = mockRequest({ name: "John", age: 25 });
    const res = mockResponse();
    const next = vi.fn();

    validateInput(schema)(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should respond with 400 if validation fails", () => {
    const schema: AnyZodObject = z.object({
      name: z.string(),
      age: z.number().min(18),
    });

    const req = mockRequest({ name: "John", age: 16 });
    const res = mockResponse();
    const next = vi.fn();

    validateInput(schema)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      error: "Input data provided is invalid",
      details: expect.arrayContaining([{ message: "'age' is Number must be greater than or equal to 18" }]),
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should respond with 500 for unexpected errors", () => {
    const schema: AnyZodObject = z.object({
      name: z.string(),
    });

    const req = mockRequest({ name: 123 });
    const res = mockResponse();
    const next = vi.fn();

    // Forcing an unexpected error
    vi.spyOn(schema, "parse").mockImplementation(() => {
      throw new Error("Unexpected error");
    });

    validateInput(schema)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    expect(next).not.toHaveBeenCalled();
  });
});
