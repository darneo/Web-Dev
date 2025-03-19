def alarm_clock(day, vacation):
  if not vacation:
    if 1 <= day <= 5:
      return '7:00'
    return '10:00'
  
  if 1 <= day <= 5:
    return '10:00'
  return 'off'