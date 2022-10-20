export default function showCreatedAt(createdAt: Date) {
  const now = new Date();
  const localTimeCreatedAt = new Date(createdAt);
  const createdTimeDiffHour = Math.floor(
    (now.getTime() - localTimeCreatedAt.getTime()) / 1000 / 60 / 60,
  );
  const createdTimeDiffMin = Math.floor(
    (now.getTime() - localTimeCreatedAt.getTime()) / 1000 / 60,
  );

  if (createdTimeDiffHour == 0) {
    if (createdTimeDiffMin == 0) {
      return 'now';
    } else if (createdTimeDiffMin == 1) {
      return '1 min ago';
    } else {
      return `${createdTimeDiffMin} mins ago`;
    }
  } else if (createdTimeDiffHour == 1) {
    return '1 hour ago';
  } else if (createdTimeDiffHour < 24) {
    return `${createdTimeDiffHour} hours ago`;
  } else {
    return localTimeCreatedAt.toString().slice(4, 16);
  }
}
