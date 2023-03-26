function ReceivedMessage({ message }) {
  return (
    <div class="col-start-1 col-end-8 p-3 rounded-none">
      <div class="flex flex-row items-center">
        <div class="flex items-center justify-center h-10 w-10 rounded-none bg-indigo-500 flex-shrink-0">
          {message.user}
        </div>
        <div class="relative ml-3 text-sm bg-white py-2 px-4 border-2 rounded-none">
          <div>{message.message}</div>
        </div>
      </div>
    </div>
  );
}

export default ReceivedMessage;
