import { NextResponse } from "next/server";

const PAT = "dcddf86cd1284ddd82ebfacb8b91ada4";
const USER_ID = "itksweb";
const APP_ID = "detect-face";
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
const URL =
  "https://api.clarifai.com/v2/models/" +
  MODEL_ID +
  "/versions/" +
  MODEL_VERSION_ID +
  "/outputs";

const detectFace = async (imgUrl) => {
  const raw = JSON.stringify({
    user_app_id: { user_id: USER_ID, app_id: APP_ID },
    inputs: [{ data: { image: { url: imgUrl } } }],
  });
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };
  const response = await fetch(URL, requestOptions);
  const result = await response.json();
  const apiData = result.outputs[0].data.regions;

  return apiData;
};

export async function POST(req) {
  const { imgUrl } = await req.json();
  const boundaries = await detectFace(imgUrl).catch((err) =>
    console.error(err.message)
  );
  return NextResponse.json(boundaries);
}
