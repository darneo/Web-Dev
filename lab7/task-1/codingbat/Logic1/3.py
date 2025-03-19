def squirrel_play(temp, is_summer):
  if temp<60:
    return False
  elif (temp <= 90 and temp >= 60) and not is_summer:
    return True
  elif (temp >= 60 and temp <=100) and is_summer:
    return True 
  else:
    return False