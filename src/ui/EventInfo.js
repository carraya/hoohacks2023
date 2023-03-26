function EventInfo({ event }) {
  return (
    <div class="flex flex-col">
      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400 font-bold">
        {event.title}
      </dt>
      <dd class="text-lg">{event.description}</dd>
    </div>
  );
}

export default EventInfo;
