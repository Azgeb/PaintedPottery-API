from PIL import Image, ImageOps
import argparse,sys


parser=argparse.ArgumentParser()
parser.add_argument("--img")
parser.add_argument("--operation")
args=parser.parse_args()

im = Image.open(f'../images/input/{args.img}').convert('RGB')
if(int(args.operation) == 0):
    im_out = ImageOps.invert(im)
    im_out.save(f'../images/output/{args.img}')
elif(int(args.operation) == 1):
    im_out = ImageOps.flip(im)
    im_out.save(f'../images/output/{args.img}')
elif(int(args.operation) == 2):
    im_out = ImageOps.grayscale(im)
    im_out.save(f'../images/output/{args.img}')