def fizz_buzz(input):
    if input % 3 == 0:
        return "fizz"
    elif input % 5 == 0:
        return "buzz"


print(fizz_buzz(5))
