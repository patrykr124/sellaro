interface pdfData {
  existingFiles: string[];
}

export const fetchPdfs = async (): Promise<pdfData> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOCALHOST}customize_get_pdf`,
    {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    const res = await response.json();
    console.log("Fetched PDFs:", res);
    return res;
  } else {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
