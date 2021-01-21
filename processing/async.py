import asyncio
import os 

def nested():
    test1 = asyncio.create_task(testing())
    print("hi")
    return 42

async def testing():
    os.system("sleep 1")
    print("hi2")

async def main():
    # Schedule nested() to run soon concurrently
    # with "main()".
    nested()

    # "task" can now be used to cancel "nested()", or
    # can simply be awaited to wait until it is complete:
    print("no")
    os.system("sleep 8")

if __name__ == "__main__":
    asyncio.run(main())